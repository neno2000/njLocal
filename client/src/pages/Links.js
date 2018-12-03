import React from 'react';

class Links extends React.Component {
  constructor(props) {
    super(props);
  }
  function() {
          var names = ['Jake', 'Jon', 'Thruster'];
          var namesList = names.map(function(name){
                          return <li>{name}</li>;
                        })

          return  <ul>{ namesList }</ul>
      }
}

export default Links;
