"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = void 0;
const user_model_1 = require("../model/user.model");
const query_model_1 = require("../model/query.model");
const resource_model_1 = __importDefault(require("../model/resource.model"));
const getAnalytics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [totalUsers, totalQueries, totalResources] = yield Promise.all([
            user_model_1.User.countDocuments(),
            query_model_1.Query.countDocuments(currentFilter),
            resource_model_1.default.countDocuments(currentFilter),
        ]);
        const uniqueQueryUsers = yield query_model_1.Query.distinct('userClerkId', currentFilter);
        const uniqueResourceUsers = yield resource_model_1.default.distinct('userId', currentFilter);
        const avgQueriesPerUser = uniqueQueryUsers.length
            ? totalQueries / uniqueQueryUsers.length
            : 0;
        const avgResourcesPerUser = uniqueResourceUsers.length
            ? totalResources / uniqueResourceUsers.length
            : 0;
        // Previous period data
        const [prevUsers, prevQueries, prevResources] = yield Promise.all([
            user_model_1.User.countDocuments(),
            query_model_1.Query.countDocuments(previousFilter),
            resource_model_1.default.countDocuments(previousFilter),
        ]);
        const prevAvgQueries = prevUsers ? prevQueries / prevUsers : 0;
        const prevAvgResources = prevUsers ? prevResources / prevUsers : 0;
        // % growth helpers
        const percentGrowth = (curr, prev) => (prev === 0 ? (curr === 0 ? 0 : 100) : ((curr - prev) / prev) * 100);
        const resourcesUploaded = yield resource_model_1.default.find({
            createdAt: { $gte: start, $lte: end },
        });
        const resourcesUploadedByUser = resourcesUploaded.reduce((acc, resource) => {
            acc[resource.userId] = (acc[resource.userId] || 0) + 1;
            return acc;
        }, {});
        const resourcesUploadedByUserArray = Object.entries(resourcesUploadedByUser).map(([userId, count]) => ({
            name: userId,
            value: count,
        }));
        const userSignups = yield user_model_1.User.find({});
        const userSignupsArray = userSignups.map((user) => ({
            date: user.createdAt.toISOString().split('T')[0],
            count: 1,
        }));
        const topInteractingUsers = yield query_model_1.Query.aggregate([
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
        const dashboardData = {
            totalUsers,
            totalResources,
            totalQueries,
            avgQueriesPerUser: +avgQueriesPerUser.toFixed(2),
            avgResourcesPerUser: +avgResourcesPerUser.toFixed(2),
            userGrowth: +percentGrowth(totalUsers, prevUsers).toFixed(2),
            resourceGrowth: +percentGrowth(totalResources, prevResources).toFixed(2),
            queryGrowth: +percentGrowth(totalQueries, prevQueries).toFixed(2),
            avgQueriesGrowth: +percentGrowth(avgQueriesPerUser, prevAvgQueries).toFixed(2),
            avgResourcesGrowth: +percentGrowth(avgResourcesPerUser, prevAvgResources).toFixed(2),
            resourcesUploadedByUser: resourcesUploadedByUserArray,
            userSignups: userSignupsArray,
            topInteractingUsers: topInteractingUsers,
        };
        return res.status(200).json({ success: true, data: dashboardData });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});
exports.getAnalytics = getAnalytics;
