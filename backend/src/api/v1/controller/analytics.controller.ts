import { NextFunction, Request, Response } from 'express';
import { User } from '../model/user.model';
import { Query } from '../model/query.model';
import Resource from '../model/resource.model';
import { CustomRequest } from 'types/custom-request';

export const getAnalytics = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { startDate, endDate } = req.params;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const duration = end.getTime() - start.getTime();
    const previousStart = new Date(start.getTime() - duration);
    const previousEnd = new Date(end.getTime() - duration);

    const currentFilter = { createdAt: { $gte: start, $lte: end } };
    const previousFilter = {
      createdAt: { $gte: previousStart, $lte: previousEnd },
    };

    // Current period data
    const [totalUsers, totalQueries, totalResources] = await Promise.all([
      User.countDocuments(),
      Query.countDocuments(currentFilter),
      Resource.countDocuments(currentFilter),
    ]);

    const uniqueQueryUsers = await Query.distinct('userClerkId', currentFilter);
    const uniqueResourceUsers = await Resource.distinct(
      'userId',
      currentFilter,
    );

    const avgQueriesPerUser = uniqueQueryUsers.length
      ? totalQueries / uniqueQueryUsers.length
      : 0;

    const avgResourcesPerUser = uniqueResourceUsers.length
      ? totalResources / uniqueResourceUsers.length
      : 0;

    // Previous period data
    const [prevUsers, prevQueries, prevResources] = await Promise.all([
      User.countDocuments(),
      Query.countDocuments(previousFilter),
      Resource.countDocuments(previousFilter),
    ]);

    const prevAvgQueries = prevUsers ? prevQueries / prevUsers : 0;
    const prevAvgResources = prevUsers ? prevResources / prevUsers : 0;

    // % growth helpers
    const percentGrowth: (curr: number, prev: number) => number = (
      curr,
      prev,
    ) => (prev === 0 ? (curr === 0 ? 0 : 100) : ((curr - prev) / prev) * 100);

    const resourcesUploaded = await Resource.find({
      createdAt: { $gte: start, $lte: end },
    });

    const resourcesUploadedByUser = resourcesUploaded.reduce(
      (acc: Record<string, number>, resource) => {
        acc[resource.userId] = (acc[resource.userId] || 0) + 1;
        return acc;
      },
      {},
    );

    const resourcesUploadedByUserArray = Object.entries(
      resourcesUploadedByUser,
    ).map(([userId, count]) => ({
      name: userId,
      value: count,
    }));

    const userSignups = await User.find({});

    const userSignupsArray = userSignups.map((user) => ({
      date: user.createdAt.toISOString().split('T')[0],
      count: 1,
    }));

    const topInteractingUsers = await Query.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: '$userClerkId',
          totalSessions: { $sum: 1 },
          sessionsWith10Messages: {
            $sum: {
              $cond: [{ $gt: [{ $size: '$messages' }, 10] }, 1, 0],
            },
          },
        },
      },
      {
        $match: {
          $or: [
            { totalSessions: { $gt: 1 } },
            { sessionsWith10Messages: { $gt: 0 } },
          ],
        },
      },
      {
        $sort: { totalSessions: -1 },
      },
    ]);

    const dashboardData: {
      totalUsers: number;
      totalResources: number;
      totalQueries: number;
      avgQueriesPerUser: number;
      avgResourcesPerUser: number;
      userGrowth: number;
      resourceGrowth: number;
      queryGrowth: number;
      avgQueriesGrowth: number;
      avgResourcesGrowth: number;
      resourcesUploadedByUser: { name: string; value: number }[];
      userSignups: { date: string; count: number }[];
      topInteractingUsers: { name: string; value: number }[];
    } = {
      totalUsers,
      totalResources,
      totalQueries,
      avgQueriesPerUser: +avgQueriesPerUser.toFixed(2),
      avgResourcesPerUser: +avgResourcesPerUser.toFixed(2),
      userGrowth: +percentGrowth(totalUsers, prevUsers).toFixed(2),
      resourceGrowth: +percentGrowth(totalResources, prevResources).toFixed(2),
      queryGrowth: +percentGrowth(totalQueries, prevQueries).toFixed(2),
      avgQueriesGrowth: +percentGrowth(
        avgQueriesPerUser,
        prevAvgQueries,
      ).toFixed(2),
      avgResourcesGrowth: +percentGrowth(
        avgResourcesPerUser,
        prevAvgResources,
      ).toFixed(2),
      resourcesUploadedByUser: resourcesUploadedByUserArray,
      userSignups: userSignupsArray,
      topInteractingUsers: topInteractingUsers,
    };

    return res.status(200).json({ success: true, data: dashboardData });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
