import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return prof.name;
    } else {
        return "Загрузка профессии...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
