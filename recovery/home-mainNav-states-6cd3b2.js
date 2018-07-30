import $ from 'jquery';


// Main Nav - Sliding Bar & Sticky
$(document).ready(() => {
    const LOGO = $('.g-main-nav__logo');

    const NAV_MENU = $('.g-main-nav__menu');
    const NAV_MENU_ITEMS = $('.g-main-nav__menu .menu__item');
    const NAV_MENU_LINKS = $('.g-main-nav__menu .menu__link');
    const NAV_BAR = $('.g-main-nav__menu-statebar');

    const CURRENT_ITEM_CLASS = 'current-menu-item';
    const OPACITY_DOWN_DATAATTRIBUTE = 'data-opacity-down';

    const ITEMS_ARRAY = NAV_MENU_ITEMS.toArray();



    const activeItem = e => {
        let link = e ? e.target : null;

        let activeKey;
        ITEMS_ARRAY.map(function(item, key) {
            let itemChild = $(item).children('.menu__link');

            if(e && link === itemChild[0]) {
                activeKey = key;
            } else if (!e && $(item).hasClass(CURRENT_ITEM_CLASS)) {
                activeKey = key;
            }
        });
        return activeKey;
    }




    // Bar - Width of the active item
    const resizeBar = activeItemKey => {
        let activeItemWidth = $(ITEMS_ARRAY[activeItemKey]).outerWidth();
        NAV_BAR.css('width', activeItemWidth);
    }


    // Bar - Placed under the active item
    const placeBar = activeItemKey => {
        let distanceToLeft = 0;

        // Items placed to the left of the active item.
        for(let i = (activeItemKey - 1); i >= 0; i--) {
            distanceToLeft += $(ITEMS_ARRAY[i]).width();
        }

        NAV_BAR.css('transform', 'translateX(' + distanceToLeft + 'px)');

        return distanceToLeft;
    }


    // Mouse Down - Other item becoming transparent
    const opacityDown = activeItemKey => {
        ITEMS_ARRAY.map(function(item, key) {
            if(activeItemKey != key) {
                $(ITEMS_ARRAY[key])
                    .children('.menu__link')
                    .attr(OPACITY_DOWN_DATAATTRIBUTE, 'true');
            }
        });
    };

    // Mouse Up - Reset
    const opacityUp = () => {
        ITEMS_ARRAY.map(function(item, key) {
            $(ITEMS_ARRAY[key])
                .children('.menu__link')
                .attr(OPACITY_DOWN_DATAATTRIBUTE, '');
        });
    };






    const init = () => {
        let navLeftDist =
            LOGO.outerWidth() +
            parseInt(LOGO.css('marginRight'), 10) +
            parseInt(NAV_MENU.css('marginLeft'), 10);

        NAV_BAR.css({
            'display': 'block',
            'left': navLeftDist,
            'width': $(ITEMS_ARRAY[0]).outerWidth()
        }); // Default statements

        placeBar(activeItem());
        resizeBar(activeItem());

        setTimeout(() => {
            NAV_BAR.css('opacity', 1);
        }, 200);
    };

    const initialItem = activeItem(); // Active item on load
    init();






    // Events
    NAV_MENU_LINKS
        .on('mouseover focusin blur', link => {
            placeBar(activeItem(link));
            resizeBar(activeItem(link));
        })
        .on('mouseout focusout', () => {
            placeBar(initialItem);
            resizeBar(initialItem);
        })
        .on('mousedown', link => { opacityDown(activeItem(link)); })
        .on('mouseup mouseout focusout', () => { opacityUp(); });
});
