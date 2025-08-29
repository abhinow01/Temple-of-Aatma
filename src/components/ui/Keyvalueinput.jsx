import React from "react";
import Image from "next/image";
import { Input } from "./input";
import { Label } from "./label";
import { Trash2 } from "lucide-react";

const Keyvalueinput = ({ field, deleteKeyValue, onChange, onclick }) => {
  console.log(field);
  return (
    <div className="grid gap-x-6 gap-y-6 grid-cols-2">
      {field.value.map((e, ind) => (
        <>
          <div>
            <div>
              <Label>Enter Question {ind + 1}</Label>
              <Input
                value={e.question}
                name="question"
                onChange={(e) => onChange(e, ind, e.target.value)}
              />
            </div>
          </div>
          <div className="relative">
            <div>
              <Label>Enter Answer {ind + 1}</Label>
              <Input
                value={e.answer}
                name="answer"
                onChange={(e) => onChange(e, ind, e.target.value)}
              />
            </div>
            <Trash2
              onClick={() => deleteKeyValue(ind)}
              className="absolute cursor-pointer h-4 w-4 -top-2 right-0"
            />
          </div>
        </>
      ))}

      <button
        style={{ minHeight: "80px" }}
        className="rounded-md w-full col-span-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[80px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:r4:"
        data-state="closed"
        onClick={onclick}
      >
        <Image
loading="eager" alt="addForm" src={"/add-form.svg"} width={20} height={20} />
        <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
          Add Field
        </p>
      </button>
    </div>
  );
};

export default Keyvalueinput;
