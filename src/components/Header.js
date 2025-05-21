import { Appbar } from 'react-native-paper';

const Header = (props) => { 
  return (
    <Appbar.Header
    theme={{
        colors:{
            primary:"#00aaff"
        }
    }}
    >
  <Appbar.Content style={{flexDirection:'row', colors:"white" ,justifyContent:"center"}} title={props.name} />
  </Appbar.Header>
  );
};

export default Header;
