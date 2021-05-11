/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
class TargetList {
  constructor() {
    this.targets = [];
  }

  add_target(target) {
    if (this.is_valid_target(target)) {
      this.targets.push(target);
      return;
    }
    console.log('Notice: attempted to add invalid target', target);
  }

  is_valid_target(target) {
    // just some defensive programming
    return (target.x !== undefined && target.x !== null)
      && (target.y !== undefined && target.y !== null)
      && (target.theta !== undefined && target.theta !== null)
      && (target.id !== undefined && target.id !== null)
  }

  get_target_by_id(target_id) {
    console.log('Searching for target:', target_id);
    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].id === target_id) {
        return this.targets[i];
      }
    }
  }

  update_target_by_id(changes) {
    const target_id = changes.id;
    console.log('Searching for target to update:', target_id, changes);
    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].id === target_id) {
        this.targets[i] = { ...this.targets[i], ...changes };
        console.log('yes! we got this', this.targets[i]);
      }
    }
  }

  remove_target(target_id) {
    console.log('Removing target:', target_id);
    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].id === target_id) {
        this.targets.splice(i, 1);
      }
    }
  }

  get_next_id() {
    let highest_id = 0;
    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].id >= highest_id) {
        highest_id = this.targets[i].id;
      }
    }
    return highest_id + 1;
  }

  get_targets() {
    return this.targets;
  }
}

class Target {
  constructor(id, x, y, theta, label) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.label = label;
  }
}

module.exports = {
  TargetList,
  Target,
};
