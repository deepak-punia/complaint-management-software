import { Card, Image} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loadComplaintwithid } from "../actions/complaints";
import { useEffect, useState } from "react";
import {API_ENDPOINT} from '../actions/types';
import Reply from './Reply';

const Complaint = (props) => {
   const id = props.id;
   const complaint = useSelector((state) => state.complaints.complaint);
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);

   useEffect(() => {
    dispatch(loadComplaintwithid(id)).then(()=>{
        setLoading(true);
    });
    
}, []);

  return (
    <>
    {loading? <><Card border="dark" style={{ width: '100%' }}>
            <Card.Header>Created by: {complaint.username}</Card.Header>
            <Card.Body>
              <Card.Title>{complaint.title}</Card.Title>
              <Card.Text>
              Proirity: {complaint.priority}
              </Card.Text>
              <Card.Text>
              Status: {complaint.status}
              </Card.Text>
              <Card.Text>
              {complaint.details}
              </Card.Text>
              <Card.Text>
                {complaint.imagesdata.map((item,key)=>{
                    return (
                        <div key={key}>
                        <Image className="w-50" fluid={'true'} thumbnail={"true"} src={`${API_ENDPOINT}/${item.url}`} />
                        </div>
                    )
                })}
              
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Posted at : {complaint.date}</small>
            </Card.Footer>
          </Card>

        {complaint.replies.map((complaint,key)=>{
            return(
                <div key={key}>
                <Card border="dark" style={{ width: '100%' }}>
            <Card.Header>Response by: {complaint.username} Role: {complaint.userrole}</Card.Header>
            <Card.Body>
              <Card.Text>
              {complaint.reply}
              </Card.Text>
              <Card.Text>
                {complaint.imagesdata.map((item,key)=>{
                    return (
                        <div key={key}>
                        <Image className="w-50" fluid={'true'} thumbnail={"true"} src={`${API_ENDPOINT}/${item.url}`} />
                        </div>
                    )
                })}
              
              </Card.Text>
            </Card.Body>
            
          </Card>
          </div>
            )
        })}
          
          <Card border="dark" style={{ width: '100%' }}>
            
            <Card.Body>
              <Reply id={id}/>
            </Card.Body>
            
          </Card>
          </>: <>Loading...</>}
    </>
  )
}

export default Complaint;