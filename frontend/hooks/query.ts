import { useQuery } from '@tanstack/react-query';
import * as resource from '@/hooks/data-access/resource';

export function useGetResources(userId: string) {
  return useQuery({
    queryKey: ['resources'],
    queryFn: () => resource.getResearchPapers(userId),
  });
}
