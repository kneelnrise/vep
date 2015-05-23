library vep.service.user;

import 'package:angular/angular.dart';
import 'package:vepweb/http/vep.http.lib.dart';
import 'package:vepweb/model/vep.model.lib.dart';
import 'dart:async';

part 'UserService.dart';

class VepServiceUserModule extends Module {
  VepServiceUserModule() {
    bind(UserService);
  }
}