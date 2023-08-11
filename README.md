# EcoLux Couture

<br>



## Description

A platform for people all around the world that aim to be fashionable while keeping their ecological standards. The objective is showcasing a curated collection of exquisite fashion pieces that seamlessly blend eco-conscious craftsmanship with opulent allure. "A kickstart to the era of fashion that marries beauty, ethics, and sophistication."



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by brands and clothing pieces, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite brands to my list and keep updated on their products.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorite and delete them.
- **edit user** - As a user I want to be able to edit my profile.
- **result** - As a user I want to see the list of brands filtered by my preferences.
- **brand listing** - As a user I want to see more details of the brand, be able to call them and visit their website and save it as favorites.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {name,  email, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { email, password, [firstName], [lastName], [birthdate], [styleType] [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { name, style, brand, }                                 |
| `DELETE`   | `/private/favorites/:brandId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/brands`                     | Renders `brands-list` view.                              |                                                          |
| `GET`      | `/brands/details/:id`         | Renders `brands-details` view for the particular user. |                                                          |
| `GET`      | `/clothingType`         | Renders `clothingType-list` view for the different clothing types. |
| `GET`      | `/clothingType/details/:id`         | Renders `clothingType-details` view for the particular piece. |








## Models

User model

```javascript
{
  name: String,
  email: String,
  password: String,
  favoriteBrands: [brandsId],
  favoriteClothes: [clothingTypeId]
}

```


Brands model
```javascript
{
  title: String,
  ecoRating: Number,
  description: String,
  clothes: [clothingTypeId]
}
```


Clothing type model
```javascript
{
  name: String,
  availableSizes: enum['S', 'M', 'L'],
  description: String,
}
```




<br>

## API's
Create our own DB unless the web scraped api isn't good
seeds.js
<br>


## Packages
node mailer - week6


<br>



## Backlog

[See the Trello board. Or Notion]



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link]()

[Deploy Link]()



<br>



### Slides

The url to your presentation slides

### Contributors
André Pinto - [`<github-username>`](https://github.com/person1-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person1-username)

Paulina Gonzalez - [`<github-username>`](https://github.com/person2-username) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/person2-username)


### Extras
pela aquisição "plant a tree"
pagina com contact the brand (num, mail, about, website)