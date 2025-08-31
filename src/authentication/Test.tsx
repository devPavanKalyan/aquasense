import { useEffect, useState, type ChangeEvent } from "react";

const Test = () => {
  const [test, setTest] = useState<string>("");

  useEffect(() => {
    console.log("Test value", test);
  }, [test]); // ✅ Runs whenever 'test' changes

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <input
        type="text"
        value={test}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTest(e.target.value);
        }}
        placeholder="Type something..."
        className="w-80 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Test;
