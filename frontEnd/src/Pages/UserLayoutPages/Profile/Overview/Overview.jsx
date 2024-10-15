import { Link } from "react-router-dom";

export default function Overview() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-primary/10 p-3 rounded">
        <Link to="/">
          <h2>Ask Question</h2>
        </Link>

        <div className="mt-2 grid grid-cols-2 text-sm">
          <div>
            <p>0</p>
            <h2>Total</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
