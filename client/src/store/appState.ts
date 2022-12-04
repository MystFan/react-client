import { ProductsState } from "./products/products.reducer";

export type AppState = {
    products: ProductsState
}

const initialState: AppState = {
    products: {
        all: []
        // all: [
        //     {
        //         id: 1,
        //         name: "Contact Email not Linked",
        //         price: 50,
        //         image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     },
        //     {
        //         id: 2,
        //         name: "Adding Images to Featured Posts",
        //         price: 50,
        //         image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     },
        //     {
        //         id: 3,
        //         name: "When will I be charged this month?",
        //         price: 50,
        //         image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     },
        //     {
        //         id: 4,
        //         name: "Payment not going through",
        //         price: 50,
        //         image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     },
        //     {
        //         id: 5,
        //         name: "Unable to add replies",
        //         price: 50,
        //         image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     }
        // ]
    }
}

export default initialState;