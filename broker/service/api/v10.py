# Copyright (c) 2017 UFCG-LSD.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
# implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from broker.plugins import base as plugin_base
from broker.service import api
from broker.utils.logger import Log
from broker.utils.framework import authorizer
from broker.utils.framework import optimizer
from broker import exceptions as ex
import os.path as path

API_LOG = Log("APIv10", "logs/APIv10.log")

submissions = {}

def new_user(data):
    if ('username' not in data or 'password' not in data or
            'email' not in data):
            API_LOG.log("Missing parameters in request")
            raise ex.BadRequestException()
        
    username = data['username']
    password = data['password']

    # authorization = authorizer.get_authorization(api.authorization_url,
    #                                             username, password)

    sucess = api.user_admin == username and api.password_admin == password
    authorization = {'success':sucess}

    if not authorization['success']:
        API_LOG.log("Unauthorized request")
        raise ex.UnauthorizedException()

    else:

        user_email = data['email']
        users = _get_authorized_users()
        
        if user_email not in users:

            if users:
                save_email = ';' + user_email
            else:
                save_email = user_email

            w = open(api.users, 'a')
            w.write(save_email)
            w.close()

        else:
            raise ex.BadRequestException('User email already in system')
        
        return user_email


def validate_user(user_email):

    if user_email not in _get_authorized_users():
        raise ex.UnauthorizedException("Unauthorized user email")
    
    return user_email


def _get_authorized_users():

        if path.isfile(api.users): 
            r = open(api.users)
            users = r.readline().split(';')
            r.close()

            return users
        
        else:
            r = open(api.users, "w")
            r.close()

            return []

def run_submission(data):
    if ('plugin' not in data or 'plugin_info' not in data):
        API_LOG.log("Missing parameters in request")
        raise ex.BadRequestException()
    
    if data['plugin'] not in api.plugins: raise ex.BadRequestException()

    plugin = plugin_base.PLUGINS.get_plugin(data['plugin'])
    submission_id, executor = plugin.execute(data['plugin_info'])
    submissions[submission_id] = executor

    return submission_id


def stop_submission(submission_id, data):

    if submission_id not in submissions.keys():
        raise ex.BadRequestException()

        # TODO: Call the executor by submission_id and stop the execution.
    return submissions[submission_id]


def list_submissions():
    submissions_status = []

    for id in submissions.keys():
        this_status = {}
        this_status['id'] = id

        this_status['status'] = (submissions[id].
                                 get_application_state())

	submissions_status.append(this_status)

    return submissions_status


def submission_status(submission_id):
    if submission_id not in submissions.keys():
        API_LOG.log("Wrong request")
        raise ex.BadRequestException()

    # TODO: Update status of application with more informations

    this_status = {}
    this_status['status'] = (submissions[submission_id].
                             get_application_state())

    this_status['execution_time'] = (submissions[submission_id].
                                     get_application_execution_time())

    this_status['start_time'] = (submissions[submission_id].
                                 get_application_start_time())

    return this_status


def submission_log(submission_id):
    if submission_id not in submissions.keys():
        API_LOG.log("Wrong request")
        raise ex.BadRequestException()
  
    logs = {'execution':'', 'stderr':'', 'stdout': ''}

    exec_log = open("logs/apps/%s/execution" % submission_id, "r")
    stderr = open("logs/apps/%s/stderr" % submission_id, "r")
    stdout = open("logs/apps/%s/stdout" % submission_id, "r")

    remove_newline = lambda x: x.replace("\n","")
    logs['execution'] = map(remove_newline, exec_log.readlines())
    logs['stderr'] = map(remove_newline, stderr.readlines())
    logs['stdout'] = map(remove_newline, stdout.readlines())

    exec_log.close()
    stderr.close()
    stdout.close()

    return logs
