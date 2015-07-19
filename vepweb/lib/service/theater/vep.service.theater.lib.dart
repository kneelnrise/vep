library vep.service.theater;

import 'package:angular/angular.dart';
import 'package:vepweb/http/vep.http.lib.dart';
import 'package:vepweb/model/vep.model.lib.dart';
import 'dart:async';
import 'dart:convert';
import 'package:jsonx/jsonx.dart' as jsonx;
import 'dart:html';
import 'package:logging/logging.dart';
import 'package:vepweb/model/theater/vep.model.theater.lib.dart';

part 'TheaterService.dart';

class VepServiceTheaterModule extends Module {
  VepServiceTheaterModule() {
    bind(TheaterService);
  }
}