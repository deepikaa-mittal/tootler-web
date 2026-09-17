const dummyPeople = [
    "https://i.pravatar.cc/64?img=32",
    "https://i.pravatar.cc/64?img=15",
    "https://i.pravatar.cc/64?img=47",
  ];
  
  export default function AvatarStack({ count }: { count: number }) {
    const displayCount = count > 999 ? `${(count / 1000).toFixed(1)}k` : count;
  
    return (
      <div className="flex items-center -space-x-3">
        {dummyPeople.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Waitlist member"
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />
        ))}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-neutral-100 text-xs font-semibold text-neutral-600">
          +{displayCount}
        </div>
      </div>
    );
  }