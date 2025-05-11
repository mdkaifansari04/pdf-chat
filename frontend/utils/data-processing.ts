// Function to process user data for the user signups chart
export function processUserData(users: any[]) {
  // Group users by date
  const usersByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date]++;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const result = Object.entries(usersByDate).map(([date, count]) => ({
    date,
    count,
  }));

  // Sort by date
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Function to process resource data for the resources uploaded chart
export function processResourceData(resources: any[]) {
  // Group resources by date
  const resourcesByDate = resources.reduce((acc, resource) => {
    const date = new Date(resource.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date]++;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const result = Object.entries(resourcesByDate).map(([date, count]) => ({
    date,
    count,
  }));

  // Sort by date
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Function to process query data for the user queries chart
export function processQueryData(queries: any[]) {
  // Group queries by date
  const queriesByDate = queries.reduce((acc, query) => {
    const date = new Date(query.createdAt).toISOString().split('T')[0];

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date]++;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const result = Object.entries(queriesByDate).map(([date, count]) => ({
    date,
    count,
  }));

  // Sort by date
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Function to calculate top users by query volume
export function calculateTopUsers(queries: any[]) {
  // Group queries by user
  const queriesByUser = queries.reduce((acc, query) => {
    const userId = query.userClerkId;

    if (!acc[userId]) {
      acc[userId] = 0;
    }

    acc[userId]++;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const result = Object.entries(queriesByUser).map(([userId, count]) => ({
    userId,
    count,
  }));

  // Sort by count (descending) and take top 5
  return result.sort((a, b) => (b.count as number) - (a.count as number)).slice(0, 5);
}

// Function to calculate resources by user
export function calculateResourcesByUser(resources: any[]) {
  // Group resources by user
  const resourcesByUser = resources.reduce((acc, resource) => {
    const userId = resource.userId;

    if (!acc[userId]) {
      acc[userId] = 0;
    }

    acc[userId]++;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const result = Object.entries(resourcesByUser).map(([userId, count]) => ({
    userId,
    count,
  }));

  // Sort by count (descending)
  return result.sort((a, b) => (b.count as number) - (a.count as number));
}
