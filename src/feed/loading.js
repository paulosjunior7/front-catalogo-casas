export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}

export const LoadingSkeleton = () => {
  return (
    <>
     <div className="flex w-full bg-teal-700 h-screen justify-center items-center">
        <h1 className="text-lg text-white animate-pulse">carregando...</h1>
      </div>
    </>
  );
};
