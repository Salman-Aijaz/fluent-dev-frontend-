export default function ScriptSkeleton() {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {[1, 2, 3,4,5,6,7,8,9,10].map((i) => (
        <div
          key={i}
          className={`flex ${
            i % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          <div className="bg-gray-300 dark:bg-gray-700 h-10 rounded-xl w-3/4 md:w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
