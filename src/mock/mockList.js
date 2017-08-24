const Mock = require('mockjs')

let list = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      idNumber: '@id',
      name: '@name',
      studentName: '@cname',
      nickName: '@clast',
      phone: /^1[34578]\d{9}$/,
      mobile: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      'gender|0-1': 0,
      email: '@email',
      createTime: '@datetime',
      birthday: '@datetime',
      startTime: '@datetime',
      endTime: '@datetime',
      'nationality|1': ['汉', '清', '蒙', '朝鲜'],
      'education|1': ['高中及以下', '大专', '本科', '研究生', '博士', '博士后'],
      'insurance|1': '@boolean',
      'classname|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'courseName|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'profession|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'courseBrief|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'professionBrief|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'industryCategory|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      'className|1': ['厨师', '美容美发', '挖掘机', '钣金喷漆'],
      agencyName: /机构0\d{1}/,
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
      agencyId: /^AG\d{5}$/,
      agencyHead: '@name',
      'employeesCount|11-99': 1,
      agencyMobile: /^1[34578]\d{9}$/,
      agencyEmail: '@email',
      superiorDepartment: '人社局',
      teacherId: /^TE\d{4}$/,
      courseId: /^CE\d{4}$/,
      studentId: /^ST\d{4}$/,
      'period|10-30': 10,
      'trainingForm|1': ['上课', '实操'],
      'trainingJobs|1': ['车工', '钳工'],
      classId: /^AG\d{5}$/,
      attendanceId: /^AG\d{5}$/,
      deviceId: /^AG\d{5}$/,
      userId: /^AG\d{5}$/,
      'deviceName|1': ['指纹机', '刷卡机'],
      'status|0-3': 0,
      'insuredStatus|0-1': 0,
      'maritalStatus|0-2': 0,
    },
  ],
})

module.exports = list
