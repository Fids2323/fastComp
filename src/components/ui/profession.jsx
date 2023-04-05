import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById());
  const isLoading = useSelector(getProfessionsLoadingStatus());

  if (!isLoading) {
    return profession.name;
  } else {
    return "Загрузка профессии...";
  }
};

Profession.propTypes = {
  id: PropTypes.string
};
export default Profession;
