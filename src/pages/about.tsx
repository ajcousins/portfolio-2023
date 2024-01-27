import React from 'react';
import Nav from '@/components/Nav';
import PageBody from '@/components/PageBody';

interface IProps {
  content: any;
}

export default function about({content}: IProps) {
  console.log("from about:", content);
  
  return (
    <>
      <Nav />
      <PageBody title="ABOUT">
        <h2>About</h2>
        <p>Some pararaph text</p>
      </PageBody>
    </>
  );
}
