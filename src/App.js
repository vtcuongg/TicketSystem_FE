import MyTicket from './Views/MyTicket';
import DataTable from './Views/TicketTable';
import NavBar from './Views/NavBar'
import { React, useMemo } from 'react';
import TicketTable from './Views/TicketTable';
import CreateTicket from './Views/CreateTicket';
import UpdateTicket from './Views/UpdateTicket';
import Report from './Views/Report';
import RatingTable from './Views/RatingTable';
import MyWork from './Views/MyWork';
function App() {
  return (
    <div>
      {/* <CreateTicket /> */}
      {/* <UpdateTicket /> */}
      {/* <TicketTable /> */}
      <Report />
      {/* <RatingTable /> */}
      {/* <MyTicket /> */}
      {/* <MyWork /> */}

    </div>
  );
}

export default App;
