import PropTypes from "prop-types";
import NavbarLeftSideCollapsible from "../../components/NavbarLeftSideCollapsible";
import CaretRightSolid from "../../assets/svg/caret-right-solid.svg?react";
import categories from "../../data/categories.json";
import { usePois } from "../../hooks/usePois";

const CategoryItem = ({ activeItem, item, itemId, itemName, onClickItem, isCollapsed }) => {
  const esActivo = activeItem && !!activeItem?.[itemId] && activeItem?.[itemId] == item[itemId];
  return (
    <li
      key={item[itemId]}
      onClick={() => onClickItem(item)}
      className={`p-4 relative text-gray-700 hover:text-red-900 cursor-pointer ${esActivo ? "bg-red-100 text-red-700 border-2 border-red-200" : "text-gray-300"}`}
    >
      <span>{item[itemName]}</span>
      {esActivo && isCollapsed && <CaretRightSolid style={{ right: "0px" }} className="hover:text-red-900 absolute w-5 h-5 top-1/2 transform -translate-y-1/2 text-gray-500" />}
    </li>
  );
};

const SubCategoryItem = ({ activeSubItem, subItem, subItemId, subItemName, onClickSubItem }) => {
  return (
    <li
      key={subItem?.[subItemId]}
      onClick={() => onClickSubItem(subItem)}
      className={`p-4 text-gray-700 hover:text-red-900 cursor-pointer ${
        activeSubItem && !!activeSubItem?.[subItemId] && activeSubItem[subItemId] == subItem[subItemId] ? "bg-red-100 text-red-700 border-2 border-red-200" : "text-gray-300"
      }`}
    >
      {subItem[subItemName]}
    </li>
  );
};

const Navigation = () => {
  const { data, loading, refetch, activePoi, setActivePoi } = usePois();

  return (
    <>
      <NavbarLeftSideCollapsible
        data={{
          title: "Capas",
          items: categories,
          subItems: data,
          activeSubItem: activePoi,
          loadingSubItems: loading,
        }}
        dataProps={{
          itemId: "id",
          itemName: "label",
          subItemId: "id",
          subItemName: "name",
        }}
        functions={{
          onClickItem: async (item) => {
            await refetch(item?.filter);
          },
          onClickSubItem: async (subItem) => {
            if (activePoi?.id === subItem?.id) {
              setActivePoi(null);
              return;
            }
            setActivePoi(subItem);
          },
        }}
        reactElements={{
          ElementItem: CategoryItem,
          ElementSubItem: SubCategoryItem,
        }}
      />
    </>
  );
};

CategoryItem.propTypes = {
  activeItem: PropTypes.object,
  item: PropTypes.object,
  itemId: PropTypes.string,
  itemName: PropTypes.string,
  onClickItem: PropTypes.func,
  isCollapsed: PropTypes.bool,
};

SubCategoryItem.propTypes = {
  activeSubItem: PropTypes.object,
  subItem: PropTypes.object,
  subItemId: PropTypes.string,
  subItemName: PropTypes.string,
  onClickSubItem: PropTypes.func,
};

export default Navigation;
