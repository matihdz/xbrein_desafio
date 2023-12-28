import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ChevronRightSolid from "../../assets/svg/chevron-right-solid.svg?react";
import SpinnerSolid from "../../assets/svg/spinner-solid.svg?react";
import Filter from "../Filter";
import ResizableBox from "../ResizableBox";

const NavbarLeftSideCollapsible = ({
  data: { items, subItems, activeSubItem, loadingSubItems, title },
  dataProps: { itemId, itemName, subItemId, subItemName },
  functions: { onClickItem, onClickSubItem },
  reactElements: { ElementItem, ElementSubItem },
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const [filteredSubItems, setFilteredSubItems] = useState([]);

  const handleFilterItemsChange = (filterText) => {
    const newFilteredItems = items.filter((item) => item[itemName].toLowerCase().includes(filterText.toLowerCase()));
    setFilteredItems(newFilteredItems);
  };

  const handleFilterSubItemsChange = (filterText) => {
    const newFilteredSubItems = subItems.filter((subItem) => subItem[subItemName].toLowerCase().includes(filterText.toLowerCase()));
    setFilteredSubItems(newFilteredSubItems);
  };

  const handleClickItem = async (item) => {
    if (loadingSubItems) return;

    if (item?.[itemId] === activeItem?.[itemId]) {
      setIsCollapsed((prev) => !prev);
      return;
    }

    setActiveItem(item);
    setIsCollapsed(true);

    if (onClickItem) await onClickItem(item);
  };

  const handleClickSubItem = async (subItem) => {
    if (onClickSubItem) await onClickSubItem(subItem);
  };

  useEffect(() => {
    if (subItems?.length) {
      setFilteredSubItems(subItems);
      setIsCollapsed(true);
    } else {
      setFilteredSubItems([]);
      setIsCollapsed(false);
    }
  }, [subItems]);

  return (
    <nav className="w-max border-t-4 border-red-700 flex h-screen bg-gray-50 select-none">
      <ResizableBox className={`transition-opacity duration-300 ease-in-out border-r-2 border-gray-200 ${!isCollapsed && "shadow-right"}`}>
        <div>
          <button
            className="p-5 flex items-center justify-between w-full text-white"
            onClick={() => {
              if (subItems?.length) setIsCollapsed(!isCollapsed);
            }}
          >
            <span className="font-bold text-gray-500 text-xl">{title}</span>
            {!!subItems?.length && <ChevronRightSolid className={`w-5 h-5 text-gray-500 ${isCollapsed ? "rotate-180" : ""}`} />}
          </button>
          <Filter onFilterChange={handleFilterItemsChange} />
        </div>
        <ul className="overflow-y-auto text-gray-300">
          {filteredItems &&
            filteredItems.map((item) => (
              <ElementItem key={item[itemId]} activeItem={activeItem} item={item} itemId={itemId} itemName={itemName} onClickItem={handleClickItem} isCollapsed={isCollapsed} />
            ))}
        </ul>
      </ResizableBox>
      {isCollapsed && (
        <ResizableBox className="border-r-2 border-gray-100 shadow-right">
          <div>
            <button className="p-5 flex items-center justify-between w-full text-white">
              <span className="line-clamp-1 font-bold text-gray-500 text-lg">{activeItem?.[itemName]}</span>
            </button>
            <Filter onFilterChange={handleFilterSubItemsChange} />
          </div>
          <ul className="overflow-y-auto font-bold text-gray-600">
            {!loadingSubItems &&
              filteredSubItems &&
              filteredSubItems.map((subItem, index) => (
                <ElementSubItem
                  key={subItem?.[subItemId] || index}
                  activeSubItem={activeSubItem}
                  subItem={subItem}
                  subItemId={subItemId}
                  subItemName={subItemName}
                  onClickSubItem={handleClickSubItem}
                />
              ))}
            {loadingSubItems && (
              <div className="p-5 flex items-center justify-center">
                <SpinnerSolid className="w-5 h-5 text-gray-500 animate-spin" />
              </div>
            )}
          </ul>
        </ResizableBox>
      )}
    </nav>
  );
};

NavbarLeftSideCollapsible.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    subItems: PropTypes.arrayOf(PropTypes.object),
    activeSubItem: PropTypes.object,
    loadingSubItems: PropTypes.bool,
    title: PropTypes.string,
  }),
  dataProps: PropTypes.shape({
    itemId: PropTypes.string,
    itemName: PropTypes.string,
    subItemId: PropTypes.string,
    subItemName: PropTypes.string,
  }),
  functions: PropTypes.shape({
    onClickItem: PropTypes.func,
    onClickSubItem: PropTypes.func,
  }),
  reactElements: PropTypes.shape({
    ElementItem: PropTypes.elementType,
    ElementSubItem: PropTypes.elementType,
  }),
};

export default NavbarLeftSideCollapsible;
