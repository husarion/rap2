FROM osrf/ros:noetic-desktop-full
LABEL maintainer="szymon.niemiec@husarion.com"

# basic tools and ros stuff
RUN apt update
RUN apt install -q -y vim curl git silversearcher-ag
RUN apt install -q -y ros-noetic-tf ros-noetic-cv-bridge ros-noetic-image-transport ros-noetic-joint-state-controller ros-noetic-xacro ros-noetic-gazebo-ros ros-noetic-move-base ros-noetic-controller-manager ros-noetic-robot-state-publisher ros-noetic-map-server ros-noetic-gmapping

# install node 14 (LTS)
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -q -y nodejs

RUN mkdir -p /ros_workspace/src
WORKDIR /root/ros_workspace/src/

# this doesnt work rn but its only needed when compiling cpp which I dont do rn
#RUN catkin_init_workspace 
#RUN echo '. /root/ros_workspace/devel/setup.sh' >> /root/.bashrc

RUN git clone https://github.com/husarion/rosbot_description.git
# patch bug in rosbot_description on noetic
COPY noetic/rosbot_gazebo.launch /root/ros_workspace/src/rosbot_description/src/rosbot_description/launch/

# set up workspace
WORKDIR /root/ros_workspace
RUN . /opt/ros/noetic/setup.sh && catkin_make
RUN . /root/ros_workspace/devel/setup.sh

RUN mkdir rap2

# install client deps
WORKDIR /root/ros_workspace/src/rap2
RUN mkdir client
COPY ./client/package.json /root/ros_workspace/src/rap2/client
WORKDIR /root/ros_workspace/src/rap2/client
RUN npm install --only=prod

# install server deps
WORKDIR /root/ros_workspace/src/rap2
RUN mkdir server
COPY ./server/package.json /root/ros_workspace/src/rap2/server
WORKDIR /root/ros_workspace/src/rap2/server
RUN npm install --only=prod

# finally let's copy source code into image
COPY . /root/ros_workspace/src/rap2

# build the client
WORKDIR /root/ros_workspace/src/rap2/client
RUN npm run build

# copy client code to public dir for server to serve
WORKDIR /root/ros_workspace/src/rap2/server
RUN mkdir -p public
RUN cp /root/ros_workspace/src/rap2/client/build/* public/

# and all is set
WORKDIR /root/ros_workspace

COPY ./start.sh /root/ros_workspace
RUN chmod +x /root/ros_workspace/start.sh
CMD [ "/root/ros_workspace/start.sh", "" ]