export const menuItems = [
    
    {
        id: 1,
        label: "menuitems.blockchain.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.blockchaintitle.text",
        isTitle: false,
        icon:'bx bx-file',
        subItems: [
            {
                id: 3,
                label: "TELOS",
                link: "/networks/:chainId",
                parentId: 2
            },
            {
                id: 4,
                label: "TELOS test net",
                link: "/networks/:chainId",
                parentId: 2
            },
        ]
    },
    {
        id: 5,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 6,
        label: "menuitems.NFTs.text",
        isTitle: false,
        icon:'bx bx-shape-circle',
        subItems: [
            {
                id: 7,
                label: "menuitems.AreaXNFT.text",
                link: "/NFT",
                parentId: 6
            },
            {
                id: 8,
                label: "menuitems.Reports.text",
                link: "/Reports",
                parentId: 6
            },
        ]
    },
    // {
    //     id: 34,
    //     label: "menuitems.relink.text",
    //     isTitle: false,
    //     icon:'mdi mdi-link',
    //     link: "/ReLink",
    // },
    
    // {
    //     id: 75,
    //     label: "menuitems.utility.list.pricing",
    //     link: "/pages/pricing",
    //     icon: "bx-money" 
    // },
    // {
    //     id: 70,
    //     label: "Services",
    //     icon: "bx-cloud-lightning",
    //     subItems: [
    //         {
    //             id: 74,
    //             label: "dProfile",
    //             link: "/apps/file-manager/dProfile",
    //             parentId: 70
    //         },
    //     ]
    // },
    // {
    //     id: 71,
    //     label: "Help",
    //     icon: "bx-help-circle",
    //     subItems: [
    //         {
    //             id: 74,
    //             label: "menuitems.utility.list.faqs",
    //             link: "/pages/faqs",
    //             parentId: 71
    //         },
    //         {
    //             id: 74,
    //             label: "Rules",
    //             link: "/help/rules",
    //             parentId: 70
    //         },
    //     ]
    // },
];

