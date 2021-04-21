# rap2

Next gen Route Admin Panel.

Modern front-end using React, Three.js bound through react-three-fiber/drei and Webpack 5.0

NOTE: Temporarily using Socket.IO version 2.3 to keep compatibility with the current backend.

NOTE: This product is Work in Progress™ so it's not something you could use right away; it's undergoing intensive development, though.

## run demo with Docker

first enable X server for gazebo GUI

```
xhost +local:root
```

build the image:

```
docker build -t rap2_demo .
```

then run container.

```
docker run --net=host -e ROS_MASTER_URI -it --env="DISPLAY" --env="QT_X11_NO_MITSHM=1" -v /tmp/.X11-unix:/tmp/.X11-unix rap2_demo
```

dont forget to disable local connections after you done working with the container:

```
xhost -local:root
```

## Approach

At this stage of development, RAP v2 is developed as frontend of single page application; it uses the old backend with slight modifications, lives alongside previous version of RAP and pubs/subs on exactly the same Socket.IO events messages.

## How to build

The build process is controlled by webpack. You can use commands below after installing deps via `npm install`

`npm run build`

will create dist/ directory with couple of static files (html, css, js) that can be put on ROSBOT. Then you can create v2 folder in previous route_admin_panel directory on the robot (in nodejs/) and replace main.js file for backend/main.js

`npm run start`

will setup and start a local development server with hot reloading on localhost port 8080. This can be used for UI development.


