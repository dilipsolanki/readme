## Requirements

1. Node.js v14
2. PHP 8.0+
3. PostgreSQL


## Setup on Local

- `git clone git@github.com:cactuscommunications/labs-playground.git labs-playground` <-- *Clone the repository on local*
- `cd labs-playground` <-- *go into the newly above directory*
- `composer install` <-- *this will install all the composer packages that are mentioned in `composer.json`*
- `npm install`  <-- *this will install all the node packages that are mentioned in `package.json`*
- `npm run dev` <-- *this will build the assets locally in `dev` mode, this means there would be no compression, no version, no minification etc.*
-  Update the `.env` file with your PostgreSQL details. Example:
    ```
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=xxxxxxx
    DB_USERNAME=xxxxxxx
    DB_PASSWORD=xxxxxxx
    ```
- `php artisan key:generate` <-- *this will generate a new application key stored inside `.env` file*
- `php artisan migrate --seed` <-- *this will create tables and would also seed certain master tables e.g: roles, permissions, tools, etc.*
- `php artisan storage:link` <-- *this will create a symbolic link from `public/storage` to `storage/app/public` and any other that are defined in `config/filesystems.php`*
- You can now access the application either using your exisitng Nginx, Apache or you can even run `php artisan serve` and start browsing it.


## Administration
- Labs Playground is accessible over SSO but since SSO is not available over local, we have secret hidden login URL through which you can login using local user.
- Login url `/labs-login`
- Default admin credentials: `admin@admin.com:coldcold`

## Misc Information
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Lottie by Airbnb](https://airbnb.design/lottie/) for various animations.
- [Laravel LiveWire](https://laravel-livewire.com/) for building reactive dynamic interfaces
- [AlpineJS](https://alpinejs.dev/) is a minimal library for adding behaviours directly to the markup
- [TailwindCSS](https://tailwindcss.com/) for building components and layouts


