type UserCardProps = {
  userName: string;
  rol: string;
}
export default function UserCard({userName, rol}: UserCardProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="aspect-square rounded-full bg-sky-400 text-white text-center text-5xl md:text-8xl uppercase p-2 shadow-md">{userName.charAt(0)}</p>
        <p className="capitalize font-bold">{userName}</p>
        <p className="capitalize font-semibold text-gray-400">{rol}</p>
      </div>
    </>
  )
}
