export const menuItems = [
    
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    
    {
        id: 3,
        label: "menuitems.locallogin.text",
        isTitle: false,
        icon:'mdi mdi-login',
        link: "/LocalLogin",
    },
   
    {
        id: 34,
        label: "menuitems.relink.text",
        isTitle: false,
        icon:'mdi mdi-link',
        link: "/ReLink",
    },
    
    {
        id: 75,
        label: "menuitems.utility.list.pricing",
        link: "/pages/pricing",
        icon: "bx-money" 
    },
    {
        id: 70,
        label: "Services",
        icon: "bx-cloud-lightning",
        subItems: [
            {
                id: 74,
                label: "dProfile",
                link: "/apps/file-manager/dProfile",
                parentId: 70
            },
        ]
    },
    {
        id: 71,
        label: "Help",
        icon: "bx-help-circle",
        subItems: [
            {
                id: 74,
                label: "menuitems.utility.list.faqs",
                link: "/pages/faqs",
                parentId: 71
            },
            {
                id: 74,
                label: "Rules",
                link: "/help/rules",
                parentId: 70
            },
        ]
    },
];

