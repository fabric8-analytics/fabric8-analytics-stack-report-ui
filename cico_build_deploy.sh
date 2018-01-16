#!/bin/bash

set -ex

. cico_setup.sh

install_dependencies

run_unit_tests

build_project

# run_ui_integration_tests

build_image

push_image

