export default function Home() {
  const router = useRouter();
  return (
    <div className="flex h-screen justify-center items-center bg-gray-700">
      <div className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <label
          className="block text-black font-bold mb-5 text-lg tracking-wider"
          htmlFor="game-room-id"
        >
          Game Room ID
        </label>
        <input
          className="border rounded-md w-full h-14 py-2 px-3 mb-6 text-black placeholder-gray-400 bg-gray-200 ring-2 focus:ring-lime-500 hover:ring-lime-500 focus:outline-none focus:shadow-outline tracking-widest"
          id="game-room-id"
          type="text"
          placeholder="5wec1"
        />

        <div className="mb-4">
          <button
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline tracking-widest text-2xl font-mono bg-yellow-200 cursor-pointer"
            type="button"
            onClick={() => {
              console.log("start game");

              //route to game room
              router.push("game");
            }}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
