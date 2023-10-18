import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

export default function BasicDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="card flex justify-content-center">
      <InputText value={value} onChange={(e) => setValue(e.target.value)} />
      {value}
    </div>
  );
}
