import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title: string;
}

export default function PageBody({ children, title }: IProps) {
  return (
    <>
      <div className="page-body">{children}</div>
      <div className="page-title">{title}</div>
    </>
  );
}
