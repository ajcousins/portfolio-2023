import React from 'react';
import Nav from '../components/Nav';
import PageBody from '@/components/PageBody';
import content from '../content/content.json'
import Tiles from '@/components/Tiles';

export default function portfolio() {
  return (
    <>
      <Nav />
      <PageBody title='PORTFOLIO'>
      {/* {JSON.stringify(content)} */}
      <Tiles content={content} />
      </PageBody>
    </>
  );
}
