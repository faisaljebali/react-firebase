import React from "react";
import { connect } from "react-redux";
//import { dismissFeedback } from "../actions/feedback";
import { notification } from 'antd';

const Feedback = props => {
  const rows = props.feedback.map((f, index) => (
    <span key={index}>
        {
              notification.open({
                message: 'Notification Title',
                description:f.msg,
                className:`danger-error-${f.error}`,
                duration: 0,
                style: {
                  width: 400,
                  marginLeft: 40 - 60,
                },
        })
        
        }
    </span>
  ));
  return (
    <span>
      {rows}
    </span>
  );
};

const mapStateToProps = state => ({ feedback: state.feedback });

//const mapDispatchToProps = { dismissFeedback };

export default connect(mapStateToProps)(Feedback);