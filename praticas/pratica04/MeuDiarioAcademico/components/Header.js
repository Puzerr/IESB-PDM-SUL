import { Text } from "react-native";
import { tituloAplicacao } from "../labels";

function Header(){
    return(
        <Text style={{alignSelf: 'center', marginTop: '5%', fontSize: '32px'}}>{tituloAplicacao}</Text>
    )
}

export default Header