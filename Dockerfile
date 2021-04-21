# WORK IN PROGRESS

FROM osrf/ros:noetic-desktop-full
LABEL maintainer="szymon.niemiec@husarion.com"

# basic tools and ros stuff
RUN apt update
RUN apt install -q -y vim curl git silversearcher-ag
RUN apt install -q -y ros-noetic-tf ros-noetic-cv-bridge ros-noetic-image-transport ros-noetic-joint-state-controller ros-noetic-xacro ros-noetic-gazebo-ros ros-noetic-move-base ros-noetic-controller-manager ros-noetic-robot-state-publisher ros-noetic-map-server ros-noetic-gmapping

# install node 14 (LTS)
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -q -y nodejs

RUN mkdir ~/ros_workspace
RUN mkdir ~/ros_workspace/src
WORKDIR /root/ros_workspace/src/
# this doesnt work rn but its only needed when compiling cpp which I dont do rn
#RUN catkin_init_workspace 

#RUN echo '. /root/ros_workspace/devel/setup.sh' >> /root/.bashrc

RUN git clone https://github.com/husarion/rosbot_description.git
RUN mkdir rap2
COPY . /root/ros_workspace/src/rap2
#RUN cd ~/ros_workspace
#RUN catkin_make
#RUN . ~/ros_workspace/devel/setup.sh

# skip this cuz gazebo installs.... or....
#curl -sSL http://get.gazebosim.org | sh

# my commands
# should I use workdir or cd

WORKDIR /root/ros_workspace
RUN . /opt/ros/noetic/setup.sh && catkin_make
RUN . /root/ros_workspace/devel/setup.sh
WORKDIR /root/ros_workspace/src/rap2

RUN cp noetic/rosbot_gazebo.launch /root/ros_workspace/src/rosbot_description/src/rosbot_description/launch/

RUN npm install 
RUN npm run build
#RUN npm run build
WORKDIR /root/ros_workspace/src/rap2/server
RUN npm install

#and after that:
WORKDIR /root/ros_workspace

CMD . /root/ros_workspace/devel/setup.sh && roslaunch rap2 demo_gazebo.launch
