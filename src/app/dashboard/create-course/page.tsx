import React, { useCallback } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { data } from "../curr.json";

const Page = () => {
  const handleSubmit = useCallback(() => {
    console.log("submit");
  }, []);
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div>
          <Label htmlFor="title">title</Label>
          <Input name="title" placeholder="Enter the course title" />
        </div>
        <div>
          <Label htmlFor="descreption">descreption</Label>
          <Input name="descreption" placeholder="Enter the course title" />
        </div>
        <div className="space-y-3">
          <Label htmlFor="descreption">Price</Label>
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Curr</SelectLabel>
                  {data.map((item) => (
                    <SelectItem value={item.name} key={item.code}>

                      <span>{item.code}</span> | <span>{item.symbol}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              name="descreption"
              placeholder="Enter the course title"
              type="number"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="descreption">Thumbnail</Label>
          <Input name="descreption" placeholder="Enter the course title" />
        </div>
      </form>
    </div>
  );
};

export default Page;
