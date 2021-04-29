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

# set up workspace
WORKDIR /root/ros_workspace
RUN . /opt/ros/noetic/setup.sh && catkin_make
RUN . /root/ros_workspace/devel/setup.sh
WORKDIR /root/ros_workspace/src/rap2

# patch bug in gazebo on noetic
RUN cp noetic/rosbot_gazebo.launch /root/ros_workspace/src/rosbot_description/src/rosbot_description/launch/

# build client
WORKDIR /root/ros_workspace/src/rap2/client
RUN npm install --only=prod
RUN npm run build

# build server
WORKDIR /root/ros_workspace/src/rap2/server
RUN npm install --only=prod
# copy client code to public dir for server to serve
RUN mkdir -p public
RUN cp /root/ros_workspace/src/rap2/client/build/* public/

# and all is set
WORKDIR /root/ros_workspace

CMD . /root/ros_workspace/devel/setup.sh && roslaunch rap2 demo_gazebo.launch
