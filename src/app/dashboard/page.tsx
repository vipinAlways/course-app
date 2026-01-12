import { User } from "lucide-react";
import React from "react";
import { Input } from "~/components/ui/input";

const Home = () => {
  return (
    <div className="relative h-full w-full">
      <div className="sticky top-1 m-1 flex items-center gap-2 px-3">
        <Input
          name="dashboard-Search"
          type="search"
          className=""
          placeholder="Search"
        />

        <User className="size-10 rounded-full border p-0.5" />
      </div>

      <section>
        
      </section>
    </div>
  );
};

export default Home;
