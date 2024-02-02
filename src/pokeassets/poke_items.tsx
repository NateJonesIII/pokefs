import { PokeItemProps } from "../types/types";

const PokeItem: React.FC<PokeItemProps> = ({
    pokemon

}) => {
    //destructure
    const {image, name} = pokemon;
    <div className="poke-card">
        <div className="poke-deets">
            <img src={image} alt={name} />
        </div>
    </div>
}

export default PokeItem;