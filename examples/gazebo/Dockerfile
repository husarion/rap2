# FROM gazebo:gzserver11
FROM osrf/ros:noetic-desktop-full
LABEL maintainer="szymon.niemiec@husarion.com"

ARG SSH_PASS

# basic tools and ros stuff
RUN apt update && apt install --fix-missing -q -y vim curl git silversearcher-ag inetutils-ping
RUN apt install --fix-missing -q -y ros-noetic-tf ros-noetic-cv-bridge ros-noetic-image-transport ros-noetic-joint-state-controller ros-noetic-xacro ros-noetic-gazebo-ros ros-noetic-move-base ros-noetic-controller-manager ros-noetic-robot-state-publisher ros-noetic-map-server ros-noetic-gmapping

# openssh support for remote roslaunching
RUN apt install --fix-missing -q -y openssh-server

RUN useradd -m -s /bin/bash -p $(openssl passwd -1 $SSH_PASS) husarion

RUN mkdir -p /home/husarion/ros_workspace/src

RUN echo "husarion:x:1000:1000:Developer,,,:/home/husarion:/bin/bash" >> /etc/passwd
RUN echo "husarion:x:1000:" >> /etc/group
RUN echo "husarion ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/husarion
RUN chmod 0440 /etc/sudoers.d/husarion

# NOTE: Remember to disable root login
WORKDIR /home/husarion/ros_workspace/src/

# this doesnt work rn but its only needed when compiling cpp which I dont do rn
#RUN catkin_init_workspace 

RUN git clone https://github.com/husarion/rosbot_description.git
# patch bug in rosbot_description on noetic
COPY ./noetic/rosbot_gazebo.launch /home/husarion/ros_workspace/src/rosbot_description/src/rosbot_description/launch/
COPY ./launch/gazebo_all.launch /home/husarion/ros_workspace/src/

# set up workspace
WORKDIR /home/husarion/ros_workspace
RUN . /opt/ros/noetic/setup.sh && catkin_make
RUN . /home/husarion/ros_workspace/devel/setup.sh

EXPOSE 11311 

USER husarion

COPY ./start.sh /home/husarion/
RUN sudo chmod +x /home/husarion/start.sh
CMD [ "/home/husarion/start.sh", "" ]