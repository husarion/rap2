# WORK IN PROGRESS

FROM osrf/ros:noetic-desktop-full
LABEL maintainer="szymon.niemiec@husarion.com"

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# basic tools and ros stuff
RUN apt update
RUN apt install -q -y vim curl git silversearcher-ag
RUN apt install -q -y ros-noetic-tf ros-noetic-cv-bridge ros-noetic-image-transport ros-noetic-joint-state-controller ros-noetic-xacro ros-noetic-gazebo-ros ros-noetic-move-base ros-noetic-controller-manager ros-noetic-robot-state-publisher ros-noetic-map-server

# install node 14 (LTS)
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -q -y nodejs

RUN mkdir ~/ros_workspace
RUN mkdir ~/ros_workspace/src
RUN cd ~/ros_workspace/src
RUN catkin_init_workspace 

#unnecessary as for one time run???
#echo '. ~/ros_workspace/devel/setup.sh' >> ~/.bashrc

RUN git clone https://github.com/husarion/husarion_ros.git
RUN git clone https://github.com/husarion/rosbot_description.git
RUN git clone https://github.com/husarion/rap2

WORKDIR /root/ros_workspace/src/route_admin_panel/nodejs

RUN cd ~/ros_workspace
RUN catkin_make
RUN . ~/ros_workspace/devel/setup.sh

# skip this cuz gazebo installs.... or....
#curl -sSL http://get.gazebosim.org | sh

# my commands
# should I use workdir or cd
RUN cd ~/ros_workspace/src/rap2
RUN npm install
RUN npm run build
RUN cd server
RUN npm install


#and after that:

CMD roslaunch rap2 demo_gazebo.launch