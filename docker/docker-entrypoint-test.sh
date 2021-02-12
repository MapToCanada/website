#!/bin/bash
pipenv install
pipenv run coverage run --source='.' --omit=.venv/* manage.py test --pattern="django_tests.py"
pipenv run coverage report
rm -rf .venv
rm -rf .coverage