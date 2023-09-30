import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return <div className="container mx-auto mt-5">{children}</div>;
}
