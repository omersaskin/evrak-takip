import { Helmet } from 'react-helmet-async';

import { BelgeTipleriView } from 'src/sections/belge-tipleri/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <BelgeTipleriView />
    </>
  );
}
