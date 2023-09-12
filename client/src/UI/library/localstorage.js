
async function CartStorageSet(course = null) {

    if (course !== null) {
        var CartCourses = JSON.parse(localStorage.getItem("CartCourses"));

        if (CartCourses) {
            try {
                CartCourses.listofcourseId.map((row, index) => {
                    if (course.contentID === row) {
                        throw new Error();
                    }
                    return;
                });

                var Cart = Object.assign({}, {
                    contentID: course.contentID,
                    Title: course.Title,
                    price: course.price,
                    Views: course.Views,
                    Rating: course.Rating,
                    Total_Hours: course.Total_Hours,
                    Course_Languages: course.Course_Languages,
                    AddedDate: course.AddedDate,
                    ForWho: course.ForWho,
                    Author: course.Author

                });

                CartCourses.cart.push(Cart);
                CartCourses.listofcourseId.push(course.contentID);

                console.log({ CartCourses });

                localStorage.setItem("CartCourses", JSON.stringify(CartCourses));
            } catch (e) {
                console.log("The Object already exist in the list");
                return false;
            }


        } else {

            var Cart = Object.assign({}, {
                contentID: course.contentID,
                Title: course.Title,
                price: course.price,
                Views: course.Views,
                Rating: course.Rating,
                Total_Hours: course.Total_Hours,
                Course_Languages: course.Course_Languages,
                AddedDate: course.AddedDate,
                ForWho: course.ForWho,
                Author: course.Author

            });

            var lists = Object.assign({}, {
                cart: [Cart],
                listofcourseId: [course.contentID],

            });

            // loc.push(courseID);
            localStorage.setItem("CartCourses", JSON.stringify(lists));
        }
    }
    else {
        return 0;
    }

}

function CartStorageGet() {
    var CartCourses = JSON.parse(localStorage.getItem("CartCourses"));
    if (CartCourses) {
        return CartCourses;
    }
    else {
        return null;
    }

}

export {
    CartStorageGet,
    CartStorageSet
}
