// FULL MENU LIST
// Note: We use string filenames for images. The frontend handles the actual image files.
const menuItems = [
    {
        _id: "1",
        name: "Greek Salad",
        image: "food_1",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg Salad",
        image: "food_2",
        price: 540,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "3",
        name: "Clover Salad",
        image: "food_3",
        price: 480,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "4",
        name: "Chicken Salad",
        image: "food_4",
        price: 720,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        image: "food_5",
        price: 420,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        image: "food_6",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        image: "food_7",
        price: 600,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "8",
        name: "Veg Rolls",
        image: "food_8",
        price: 450,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    },
    {
        _id: "9",
        name: "Ripple Ice Cream",
        image: "food_9",
        price: 420,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "10",
        name: "Fruit Ice Cream",
        image: "food_10",
        price: 660,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "11",
        name: "Jar Ice Cream",
        image: "food_11",
        price: 300,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: "food_12",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: "food_13",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: "food_14",
        price: 540,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "15",
        name: "Grilled Sandwich",
        image: "food_15",
        price: 480,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "16",
        name: "Bread Sandwich",
        image: "food_16",
        price: 720,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "17",
        name: "Cup Cake",
        image: "food_17",
        price: 420,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "18",
        name: "Vegan Cake",
        image: "food_18",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "19",
        name: "Butterscotch Cake",
        image: "food_19",
        price: 600,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "20",
        name: "Sliced Cake",
        image: "food_20",
        price: 450,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    },
    {
        _id: "21",
        name: "Garlic Mushroom",
        image: "food_21",
        price: 420,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "22",
        name: "Fried Cauliflower",
        image: "food_22",
        price: 660,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "23",
        name: "Mix Veg Pulao",
        image: "food_23",
        price: 300,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "24",
        name: "Rice Zucchini",
        image: "food_24",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: "food_25",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: "food_26",
        price: 540,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "27",
        name: "Creamy Pasta",
        image: "food_27",
        price: 480,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "28",
        name: "Chicken Pasta",
        image: "food_28",
        price: 720,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "29",
        name: "Butter Noodles",
        image: "food_29",
        price: 420,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "30",
        name: "Veg Noodles",
        image: "food_30",
        price: 360,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "31",
        name: "Somen Noodles",
        image: "food_31",
        price: 600,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "32",
        name: "Cooked Noodles",
        image: "food_32",
        price: 450,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    },
    {
        _id: "33",
        name: "Smash Burger Sandwich",
        image: "smash_burger",
        price: 120,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "34",
        name: "Double Smash Burger Sandwich",
        image: "double_smash_burger",
        price: 160,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "35",
        name: "Chicken Shawarma Sandwich",
        image: "chicken_shawarma",
        price: 95,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "36",
        name: "Hotdog Sandwich",
        image: "hotdog",
        price: 85,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "37",
        name: "Mini Pancakes",
        image: "mini_pancakes",
        price: 70,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }
];

export function getMenu(req, res, next) {
    try {
        return res.json({ success: true, items: menuItems });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error loading menu" });
    }
}