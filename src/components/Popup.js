import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

const CustomModal = () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    contentStyle={contentStyle}
  >
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Ticket Status </div>
        <div className="content">
                          <label>Ticket ID  : </label> 1 <br/>
                          <label>Email ID   : </label> sdcz <br/>
                          <label>Department : </label> sfsd <br/>
        </div>
        <div className="actions">
          {/* <Popup
            trigger={<button className="button"> Menu Demo </button>}
            position="top center"
            closeOnDocumentClick
            contentStyle={{ padding: "0px", border: "none" }}
          >
            <div className="menu">
              <div className="menu-item"> Menu item 1</div>
              <div className="menu-item"> Menu item 2</div>
              <div className="menu-item"> Menu item 3</div>
               <Popup
                trigger={<div className="menu-item"> sup Menu </div>}
                position="right top"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
              >
                <div className="menu">
                  <div className="menu-item"> item 1</div>
                  <div className="menu-item"> item 2</div>
                  <div className="menu-item"> item 3</div>
                </div>
              </Popup> 
              <div className="menu-item"> Menu item 4</div>
            </div>
          </Popup> */}
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>

          <button onClick={() => {console.log("this.handleReject")}}  className="button">Reject</button>
          <Popup
            trigger={<button className="button">AssignTo </button>}
            position="top center"
            closeOnDocumentClick
            contentStyle={{ padding: "0px", border: "none" }}
          >
                <div className="menu">
                  <div className="menu-item"> Rahul</div>
                  <div className="menu-item"> Ajay</div>
                  <div className="menu-item"> Alex</div>
                </div>
              </Popup> 
          {/* <button onClick={()=> {console.log("this.handleAssignTo")}} className="button">AssignTo</button> */}
          <button onClick={()=>{console.log("this.handleTicketClose")}} className="button">Close Ticket</button>
        </div>
      </div>
    )}
  </Popup>
);

export default Warper(CustomModal);
