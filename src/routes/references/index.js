import React from 'react';
import References from './References';
import fetch from '../../core/fetch';

export const path = '/references/:page';
export const action = async (state) => {
  const { params } = state;
  const { page } = params;
  const resp = await fetch(`/wiki-api/refs/${page}`);
  const data = await resp.json();
  state.context.onSetTitle(`Wiki Reference History | ${page}`);
  return <References page={page} references={data} />
};
