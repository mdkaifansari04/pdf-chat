import { Skeleton } from '../ui/skeleton';

export default function ResourceLoadingView() {
  return (
    <div className="flex flex-col gap-2 px-2 pt-5">
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
      <Skeleton className="h-8 rounded-md" />
    </div>
  );
}
